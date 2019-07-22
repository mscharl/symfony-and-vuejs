declare const __CONFIG__: {
    facebook: {
        app_id: string
        api_version: string
    },
    google: {
        maps_key: string,
    },
    some_global_relevant_parameter: string
};

declare const Translator: {
    trans(key: string): string;
};
