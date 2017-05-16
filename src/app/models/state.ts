import { ModuleBooks } from '../books/models/module-books';

export class State {
    moduleBooks: ModuleBooks;

    constructor() {
        this.moduleBooks = new ModuleBooks();        
    }
}
