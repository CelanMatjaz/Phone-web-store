import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLFloat,
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

const LoginResponseType = new GraphQLObjectType({
    name: 'LoginResponse',
    fields: () => ({
        token: { type: GraphQLString },
        error: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Products: {
            type: new GraphQLList(ProductType),
            resolve: () => Product.find({})
        },
        Orders: {
            type: new GraphQLList(OrderType),
            resolve: (parent, args, context) => {
                const { user } = context;
                if(user) return Order.find({ userId: user.id });
                return [];
            }
        },
        Users: {
            type: new GraphQLList(UserType),
            resolve: () => {
                return User.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        login: {
            type: LoginResponseType,
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
            type: GraphQLString,
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
                        return 'New user registered';
                    }

                }
                return 'Error registering user';
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});