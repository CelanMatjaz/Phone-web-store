import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean
} from 'graphql';

import User from '../Models/User';
import Review from '../Models/Review';
import Order from '../Models/Order';
import Product from '../Models/Product';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import products from '../default_products';

//Saves products to database if there are no products
Product.find({}, (err, arr) => {
    if(arr.length < 1){
        Product.deleteMany({}, () => {
            products.forEach((product, i) => {
                const newProduct = new Product({ ...product });
                newProduct.save(() => console.log(`Saved product ${i+1}`))
            });
        });
    }
});

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        make: { type: GraphQLString },
        price: { type: GraphQLFloat },
        image: { type: GraphQLString }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        address: { type: GraphQLString },
        orders: {
            type: new GraphQLList(OrderType),
            resolve: parent => Order.find({ userId: parent.id })
        },
        cartItems: {
            type: new GraphQLList(CartItemType),
            resolve: async parent => {
                const user = await User.findById(parent.id);                
                return user.cartItems;
            }
        }
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve: parent => {
                return { products } = Order.findById(id);
            }
        },
        user: {
            type: UserType,
            resolve: parent => User.findById(parent.userId)
        }
    })
});

const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        token: { type: GraphQLString },
        message: { type: GraphQLString },
        error: { type: GraphQLString }
    })
});

const CartItemType = new GraphQLObjectType({
    name: 'CartItem',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        quantity: { type: GraphQLInt },
        make: { type: GraphQLString },
        price: { type: GraphQLFloat },
        image: { type: GraphQLString },
        cartQuantity: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Products: {
            type: new GraphQLList(ProductType),
            resolve: () => Product.find({})
        },
        Product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => Product.findById(args.id)
        },
        Orders: {
            type: new GraphQLList(OrderType),
            resolve: (parent, args, { user }) => {
                if(user) return Order.find({ userId: user.id });
                return [];
            }
        },
        User: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve: (a, { id }) => {
                return User.findById(id)
            }
        },
        LoginCheck: {
            type: GraphQLString,
            args: { token: { type: GraphQLString } },
            resolve: async (a, { token }) => {
                const decoded = await jwt.verify(token, process.env.SECRET);
                const user = await User.findById(decoded.data.id);
                if(user){
                    const token = await jwt.sign({
                        data: {
                            id: user._id,
                            email: user.email,
                            address: user.address
                        }
                    }, process.env.SECRET, { expiresIn: '1y' });
                    return token;
                }
                return null;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: ResponseType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const { email, password } = args;
                const user = await User.findOne({ email: email });
                if(user && bcrypt.compareSync(password, user.password)){
                    const token = await jwt.sign({
                        data: {
                            id: user._id,
                            email: user.email,
                            address: user.address
                        }
                    }, process.env.SECRET, { expiresIn: '1y' });
                    return {
                        token
                    };
                }
                return {
                    error: 'There is no user with that email, or you typed in an incorrect password'
                };
            }
        },
        register: {
            type: ResponseType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString },
                passwordRepeat: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                const { email, password, passwordRepeat } = args;
                const user = await User.findOne({ email });
                if(!user){
                    const passwordsMatch = password === passwordRepeat;
                    const passwordLength = password.length > 7 && password.length < 21;

                    if(passwordsMatch && passwordLength){
                        const newUser = new User({
                            email: email,
                            password: bcrypt.hashSync(password, 10)
                        });
                        newUser.save();
                        return {
                            message: 'New user registered'
                        };
                    }

                }
                return {
                    error: 'Error registering user'
                };
            }
        },
        addItemToCart: {
            type: ResponseType,
            args: { userId: { type: GraphQLID }, itemId: { type: GraphQLID } },
            resolve: async (parent, args) => {
                const { userId, itemId } = args;
                if(userId && itemId){
                    const user = await User.findById(userId);
                    if(user.cartItems.length < 5){
                        if(!user.cartItems.find(item => item.id === itemId)){
                            const prod = await Product.findById(itemId);
                            user.cartItems.push({
                                id: itemId,
                                cartQuantity: 1,
                                name: prod.name,
                                image: prod.image,
                                price: prod.price,
                                make: prod.make,
                                quantity: prod.quantity
                            });
                            await User.findByIdAndUpdate(userId, user);
                            return {
                                message: 'Added item to cart'
                            }
                        }
                        return {
                            error: 'Item is already in cart'
                        }
                    }
                    return {
                        error: 'You can only have a maximum of 5 different items in your cart'
                    }
                }
                return {
                    error: 'Item was not added to cart'
                }
            }
        },
        removeItemFromCart: {
            type: ResponseType,
            args: { userId: { type: GraphQLID }, itemId: { type: GraphQLID } },
            resolve: async (parent, args) => {
                console.log(args);
                const { userId, itemId } = args;
                if(userId && itemId){
                    const user = await User.findById(userId);
                    const updatedCartItems = user.cartItems.filter(item => item.id !== itemId);
                    await User.findByIdAndUpdate({ _id: userId }, { cartItems: updatedCartItems });
                    return {
                        message: 'Removed item from cart'
                    }
                }
                return {
                    error: 'Item was not added to cart'
                }
            }
        },
        incrementItemInCart: {
            type: ResponseType,
            args: { userId: { type: GraphQLID }, itemId: { type: GraphQLID } },
            resolve: async (parent, args) => {
                const { userId, itemId } = args;
                if(userId && itemId){
                    const user = await User.findById(userId);
                    const updatedCartItems = user.cartItems.map(item => {
                        if(item.id === itemId) item.cartQuantity++;
                        return item;
                    });
                    await User.findByIdAndUpdate({ _id: userId }, { cartItems: updatedCartItems });
                    return {
                        message: 'Item quantity was incremented'
                    }
                }
                return {
                    error: 'Item quantity was not incremented'
                }
            }
        },
        decrementItemInCart: {
            type: ResponseType,
            args: { userId: { type: GraphQLID }, itemId: { type: GraphQLID } },
            resolve: async (parent, args) => {
                const { userId, itemId } = args;
                if(userId && itemId){
                    const user = await User.findById(userId);
                    let updatedCartItems = user.cartItems.map(item => {
                        if(item.id === itemId) item.cartQuantity--;
                        if(item.cartQuantity === 0) return null;
                        return item;
                    });
                    updatedCartItems = updatedCartItems.filter(item => item);
                    await User.findByIdAndUpdate({ _id: userId }, { cartItems: updatedCartItems });
                    return {
                        message: 'Item quantity was decremented'
                    }
                }
                return {
                    error: 'Item quantity was not decremented'
                }
            }
        },
        clearCart: {
            type: ResponseType,
            args: { userId: { type: GraphQLID } },
            resolve: async (parent, args) => {
                const { userId } = args;
                if(userId){ 
                    await User.findByIdAndUpdate({ _id: userId }, { cartItems: [] });                    
                    return {
                        message: 'Cart was cleared'
                    }
                }
                return {
                    error: 'Cart was not cleared'
                }
            }
        },
        /*placeOrder: {
            type: ResponseType,
            args: { userId: { type: GraphQLID }, items: { type: new GraphQLList(CartItemType) } },
            resolve: async (parent, args) => {
                console.log(args);
            }
        }*/
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});