export default function auth({ next, store }) {
    if (!store.getters.getUserToken) {
        return next({
            name: 'authorization'
        })
    }
    return next()
}