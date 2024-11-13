export class DayOutPackage {
    private id: string;
    private name: string;
    private description: string;
    private duration: string;
    private unitPrice: number;
    private inclusion: string;
    private equipments: string;
    private ageLimit: string;
    private timeOfDay: string;
    private foodDetails: string;
    private groupSize: string;
    private image: Blob | null;
    private rating: number;
    private available: boolean;

    constructor(
        id: string,
        name: string,
        description: string,
        duration: string,
        unitPrice: number,
        inclusion: string,
        equipments: string,
        ageLimit: string,
        timeOfDay: string,
        foodDetails: string,
        groupSize: string,
        image: Blob | null,
        rating: number,
        available: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.unitPrice = unitPrice;
        this.inclusion = inclusion;
        this.equipments = equipments;
        this.ageLimit = ageLimit;
        this.timeOfDay = timeOfDay;
        this.foodDetails = foodDetails;
        this.groupSize = groupSize;
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

    public getDuration(): string {
        return this.duration;
    }

    public getUnitPrice(): number {
        return this.unitPrice;
    }

    public getInclusion(): string {
        return this.inclusion;
    }

    public getEquipments(): string {
        return this.equipments;
    }

    public getAgeLimit(): string {
        return this.ageLimit;
    }

    public getTimeOfDay(): string {
        return this.timeOfDay;
    }

    public getFoodDetails(): string {
        return this.foodDetails;
    }

    public getGroupSize(): string {
        return this.groupSize;
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