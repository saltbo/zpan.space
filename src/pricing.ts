export type LicenseEdition = 'pro' | 'business';
export type BillingPeriod = 'month' | 'year';

export interface LicenseOffer {
	sku: string;
	edition: LicenseEdition;
	currency: string;
	billingPeriod: BillingPeriod;
	amountMinor: number;
	checkoutUrl: string;
}

export interface LicenseQuoteCatalog {
	version: string;
	updatedAt: string;
	offers: LicenseOffer[];
}

const mockCatalog: LicenseQuoteCatalog = {
	version: 'mock-1',
	updatedAt: '2026-07-22T00:00:00.000Z',
	offers: [
		{ sku: 'pro-usd-month', edition: 'pro', currency: 'USD', billingPeriod: 'month', amountMinor: 900, checkoutUrl: 'https://cloud.zpan.space' },
		{ sku: 'pro-usd-year', edition: 'pro', currency: 'USD', billingPeriod: 'year', amountMinor: 9000, checkoutUrl: 'https://cloud.zpan.space' },
		{ sku: 'business-usd-month', edition: 'business', currency: 'USD', billingPeriod: 'month', amountMinor: 2900, checkoutUrl: 'https://cloud.zpan.space' },
		{ sku: 'business-usd-year', edition: 'business', currency: 'USD', billingPeriod: 'year', amountMinor: 29000, checkoutUrl: 'https://cloud.zpan.space' },
	],
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}

function parseCatalog(value: unknown): LicenseQuoteCatalog {
	if (!isRecord(value) || typeof value.version !== 'string' || typeof value.updatedAt !== 'string' || !Array.isArray(value.offers)) {
		throw new Error('The ZPan Cloud pricing response has an invalid catalog shape.');
	}

	const offers = value.offers.map((offer, index): LicenseOffer => {
		if (!isRecord(offer)
			|| typeof offer.sku !== 'string'
			|| (offer.edition !== 'pro' && offer.edition !== 'business')
			|| typeof offer.currency !== 'string'
			|| (offer.billingPeriod !== 'month' && offer.billingPeriod !== 'year')
			|| typeof offer.amountMinor !== 'number'
			|| !Number.isInteger(offer.amountMinor)
			|| offer.amountMinor <= 0
			|| typeof offer.checkoutUrl !== 'string') {
			throw new Error(`The ZPan Cloud pricing response has an invalid offer at index ${index}.`);
		}

		return {
			sku: offer.sku,
			edition: offer.edition,
			currency: offer.currency.toUpperCase(),
			billingPeriod: offer.billingPeriod,
			amountMinor: offer.amountMinor,
			checkoutUrl: offer.checkoutUrl,
		};
	});

	const uniqueSkus = new Set(offers.map((offer) => offer.sku));
	if (offers.length === 0) throw new Error('The ZPan Cloud pricing response contains no offers.');
	if (uniqueSkus.size !== offers.length) throw new Error('The ZPan Cloud pricing response contains duplicate SKUs.');
	for (const offer of offers) {
		try {
			const url = new URL(offer.checkoutUrl);
			if (url.protocol !== 'https:') throw new Error();
		} catch {
			throw new Error(`The ZPan Cloud pricing response contains an invalid checkout URL for ${offer.sku}.`);
		}
	}

	const currencies = [...new Set(offers.map((offer) => offer.currency))];
	for (const currency of currencies) {
		for (const edition of ['pro', 'business'] as const) {
			for (const billingPeriod of ['month', 'year'] as const) {
				if (!offers.some((offer) => offer.currency === currency && offer.edition === edition && offer.billingPeriod === billingPeriod)) {
					throw new Error(`The ZPan Cloud pricing response is missing ${edition}/${currency}/${billingPeriod}.`);
				}
			}
		}
	}

	return { version: value.version, updatedAt: value.updatedAt, offers };
}

export async function getLicenseQuoteCatalog(): Promise<{ catalog: LicenseQuoteCatalog; isMock: boolean }> {
	const source = import.meta.env.PRICING_SOURCE ?? 'mock';
	if (source === 'mock') return { catalog: parseCatalog(mockCatalog), isMock: true };
	if (source !== 'cloud') throw new Error(`Unsupported PRICING_SOURCE: ${source}`);

	const endpoint = import.meta.env.ZPAN_CLOUD_PRICING_URL ?? 'https://cloud.zpan.space/api/public/pricing/licenses';
	const response = await fetch(endpoint);
	if (!response.ok) throw new Error(`ZPan Cloud pricing request failed with HTTP ${response.status}.`);

	return { catalog: parseCatalog(await response.json()), isMock: false };
}
