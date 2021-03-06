import type i18next from 'i18next';
import type { Dispatch } from 'redux';

export type I18next = typeof i18next;

declare global {
    interface Window {
        __initialData__: any;
        initialLanguage: string;
        initialI18nStore: Record<string, any>;
    }
}

export interface Product {
    id: number,
    color: string,
    pantone_value: string,
    year: number,
    name: string
}

export type Products = Product[];

export interface Store {
    goods: {
        products: Product[],
        product: Product
    }
}

export type Language = 'ru' | 'en';

export interface ThunkAction {
    (dispatch: Dispatch): Promise<void>;
}

export interface InitialAction {
    (req?: { originalUrl: string }): ThunkAction;
}




