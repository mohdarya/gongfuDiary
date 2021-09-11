export function editTea(newEntry, teaID)
{
    return {
        type: 'EDIT_TEA',
        teaID,
        newEntry

    };
}

export function addTea(newEntry)
{
    return {
        type: 'ADD_TEA',
        newEntry


    };
}

export function removeTea(sessionID)
{
    return {
        type: 'REMOVE_TEA',
        sessionID


    };
}