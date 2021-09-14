/*
planned to add (Origin, Vendor, Link)
{

teaName:
sessionID:
steeps:[[{
 level:
 note:
 Detail:
 }]]
}
 */


const initialState = {

    flavorNotes: [
        {
            'note': 'Marine',
            'detail': ['Seaweed', 'Ocean Air']
        },
        {
            'note': 'Mineral',
            'detail': ['Salt', 'Metallic', 'Wet Rocks']
        },
        {
            'note': 'Earth',
            'detail': ['moss', 'Musty', 'Leather', 'Compost', 'Wet Earth', 'Forest Floor', 'Decaying Wood']
        },
        {
            'note': 'Wood',
            'detail': ['Pine', 'Bark', 'Cedar', 'Resin', 'Wet Wood', 'Dark Wood', 'Green Wood', 'Cherry Wood']
        },
        {
            'note': 'Vegetal',
            'detail': ['Grass', 'Stems', 'Straw', 'Spinach', 'Broccoli', 'Zucchini', 'Asparagus', 'Garden Peas', 'Green Pepper']
        },
        {
            'note': 'Herbs',
            'detail': ['Thyme', 'Parsley', 'Cardamon', 'Eucalyptus', 'Fennel Seed', 'Coriander Seed']
        },
        {
            'note': 'Floral',
            'detail': ['Rose', 'Hops', 'Orchid', 'Violet', 'Jasmine', 'Perfume', 'Geranium', 'Dandelion', 'Honeysuckle', 'Cherry Blossom', 'Orange Blossom']
        },
        {
            'note': 'Nutty',
            'detail': ['Almond', 'Peanut', 'Walnut', 'Chestnut', 'Hazelnut', 'Roasted Nuts']
        },
        {
            'note': 'Sweet',
            'detail': ['Malt', 'Candy', 'Honey', 'Caramel', 'Molasses', 'Burnt Sugar', 'Maple Syrup']
        },
        {
            'note': 'Char',
            'detail': ['Ash', 'Tar', 'Toast', 'Smoke', 'Tobacco', 'Fireplace', 'Burnt Food', 'Grilled Food']
        },
        {
            'note': 'Spicy',
            'detail': ['Cocoa', 'Clove', 'Vanilla', 'Pepper', 'Saffron', 'Nutmeg', 'Licorice', 'Menthol', 'Cinnamon']
        },
        {
            'note': 'Tropical Fruit',
            'detail': ['Mango', 'Melon', 'Lychee', 'Banana', 'Pineapple']
        },
        {
            'note': 'Tree Fruit',
            'detail': ['Peach', 'Pear', 'Apricot', 'Red Apple', 'Green Apple', 'Dried Fruits']
        },
        {
            'note': 'Citrus Fruit',
            'detail': ['Lemon', 'Orange', 'Grapefruit', 'Citrus Zest']
        },
        {
            'note': 'Berries',
            'detail': ['Raspberry', 'Strawberry', 'Blackberry', 'Black Currant']
        }

    ],
    diaryEntry: [],
};

export function diaryEntryReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_STEEP':
            const index = state.diaryEntry.findIndex(item => item.sessionID === action.sessionID)
            const newArray = state.diaryEntry
            newArray[index].steeps = [...state.diaryEntry[index].steeps, [action.newSteep]]

            return {
                ...state,
                diaryEntry: newArray

            }
        case 'ADD_ENTRY':
            return {
                ...state,
                diaryEntry: [...state.diaryEntry, {...action.newEntry}]

            }
        case 'REMOVE_ENTRY':
            return {
                ...state,
                diaryEntry: state.diaryEntry.filter(item => item.sessionID !== action.sessionID)

            }


        default:
            return state;
    }


}
