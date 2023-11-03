export const load = ({ url }) => {
    const queries = url.searchParams;
    const id = queries.has('id') ? queries.get('id') : '';
    return {
        id
    }
};