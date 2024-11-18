export class Room {
    id: string;
    type: string;
    name: string;
    description: string;
    capacity: number;
    features: string;
    price: number;
    bedType: string;
    view: string;
    internetAccess: boolean;
    television: boolean;
    image: string;
    rating: number;
    available: boolean;

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
        image: string,
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

    public getCapacity(): number {
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

    public getImage(): string {
        return this.image;
    }

    public getRating(): number {
        return this.rating;
    }

    public isAvailable(): boolean {
        return this.available;
    }
}