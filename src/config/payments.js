export const CREDIT_PACKS = [10, 20, 50, 100]; // or whatever values you use

export const PLAN_IDS={
    UNLIMITED_YEARLY:{
        id:'plan_QqQlKBPn7YB9oT',
        planName:'Unlimited Yearly',
        description: 'Yearly Subscription, 2 months, free',
        totalBillingCycleCount:5
    },
    UNLIMITED_MONTHLY:{
        id:'plan_QqQlltXMoG5hYq',
        planName:'Unlimited Monthly',
        description: 'Monthly Subscription',
        totalBillingCycleCount:12
    },

};

export const pricingList=[
    {
    price:"Credit Pack",
    list: [
        {detail:"10 CREDITS FOR RS.10",},
        {detail:"20 CREDITS FOR RS.20",},
        {detail:"50 CREDITS FOR RS.50",},
        {detail:"100 CREDITS FOR RS.100",}
    ],
},
{
    price:"Unlimited Monthly",
    list: [
        {detail:"UNLIMITED LINKS",},
        {detail:"AUTO RENEWED",},
        {detail:"CHARGED MONTHLY",},
        {detail:"CANCEL ANYTIME",}
    ],
},
{
    price:"Unlimited Yearly",
    list: [
        {detail:"UNLIMITED LINKS",},
        {detail:"AUTO RENEWED",},
        {detail:"CHARGED YEARLY",},
        {detail:"CANCEL ANYTIME",}
    ],
},
];