export class Hall {
    id: string;
    name: string;
    description: string;
    type: string;
    capacity: number;
    price: number;
    availEquip: string;
    internetAccess: boolean;
    climateControl: boolean;
    decoratorStyle: string;
    image: Blob | null;
    rating: number;
    available: boolean;

    constructor(
        id: string,
        name: string,
        description: string,
        type: string,
        capacity: number,
        price: number,
        availEquip: string,
        internetAccess: boolean,
        climateControl: boolean,
        decoratorStyle: string,
        image: Blob | null,
        rating: number,
        available: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.capacity = capacity;
        this.price = price;
        this.availEquip = availEquip;
        this.internetAccess = internetAccess;
        this.climateControl = climateControl;
        this.decoratorStyle = decoratorStyle;
        this.image = image;
        this.rating = rating;
        this.available = available;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getDescription(): string {
        return this.description;
    }

    public getType(): string {
        return this.type;
    }

    public getCapacity(): number {
        return this.capacity;
    }

    public getPrice(): number {
        return this.price;
    }

    public getAvailEquip(): string {
        return this.availEquip;
    }

    public hasInternetAccess(): boolean {
        return this.internetAccess;
    }

    public hasClimateControl(): boolean {
        return this.climateControl;
    }

    public getDecoratorStyle(): string {
        return this.decoratorStyle;
    }

    public getImage(): Blob | null {
        return this.image;
    }

    public getRating(): number {
        return this.rating;
    }

    public isAvailable(): boolean {
        return this.available;
    }
}