export interface IRepository<T> {
    save(model: T): Promise<void>;
    update(model: T): Promise<void>;
    delete(model: T): Promise<void>;
    findById(id: string): Promise<T>;
    findAll(): Promise<T[]>;
}