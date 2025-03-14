export interface IRepository<T> {
    save(model: T): Promise<void>;
    update(model: T): Promise<void>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}