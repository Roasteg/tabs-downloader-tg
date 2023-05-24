class SearchService {
    private  _searchString: string = "";
    private _page: number = 0;

    get searchString(): string {
        return this._searchString;
    }

    set searchString(value: string) {
        this._searchString = value;
    }

    get page(): number {
        return this._page;
    }

    set page(value: number) {
        this._page = value;
    }
}

export default SearchService;