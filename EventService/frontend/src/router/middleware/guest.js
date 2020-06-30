export default function guest ({ next, store }){
    if(store.getters.getUserToken){
        return next({
           name: 'home'
        })
    }
   
    return next()
   }