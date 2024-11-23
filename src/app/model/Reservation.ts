export class Reservation {
    id: string | null;
    customerId: string | null;
    totPrice: number;
    status: string;
    noMembers: number;
    paymentCompleted: boolean;
    createdDate: string;
    createdTime: string;
    specialRequests: string;
    resourceType: string;

    constructor(
        id: string | null,
        customerId: string | null,
        totPrice: number,
        status: string,
        noMembers: number,
        paymentCompleted: boolean,
        createdDate: string,
        createdTime: string,
        specialRequests: string,
        resourceType: string
    ) {
        this.id = id;
        this.customerId = customerId;
        this.totPrice = totPrice;
        this.status = status;
        this.noMembers = noMembers;
        this.paymentCompleted = paymentCompleted;
        this.createdDate = createdDate;
        this.createdTime = createdTime;
        this.specialRequests = specialRequests;
        this.resourceType = resourceType;
    }
}
