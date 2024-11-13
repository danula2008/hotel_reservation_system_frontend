export class Room {
    private id: string;
    private type: string;
    private name: string;
    private description: string;
    private capacity: number;
    private features: string;
    private price: number;
    private bedType: string;
    private view: string;
    private internetAccess: boolean;
    private television: boolean;
    private image: Blob | null;
    private rating: number;
    private available: boolean;

    constructor(
        id: string,
        type: string,
        name: string,
        description: string,
        capacity: number,
        features: string,
        price: number,
        bedType: string,
        view: string,
        internetAccess: boolean,
        television: boolean,
        image: Blob | null,
        rating: number,
        available: boolean
    ) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.description = description;
        this.capacity = capacity;
        this.features = features;
        this.price = price;
        this.bedType = bedType;
        this.view = view;
        this.internetAccess = internetAccess;
        this.television = television;
        this.image = image;
        this.rating = rating;
        this.available = available;
    }

    public getId(): string {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCapacity(): number | null {
        return this.capacity;
    }

    public getFeatures(): string {
        return this.features;
    }

    public getPrice(): number {
        return this.price;
    }

    public getBedType(): string {
        return this.bedType;
    }

    public getView(): string {
        return this.view;
    }

    public hasInternetAccess(): boolean {
        return this.internetAccess;
    }

    public hasTelevision(): boolean {
        return this.television;
    }

    public getImage(): Blob | null {
        return this.image;
    }

    public getRating(): number | null {
        return this.rating;
    }

    public isAvailable(): boolean {
        return this.available;
    }
}