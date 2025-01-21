import { User } from "../mongoose/user.mjs";
import { hashPassword } from "../utils/helpers.mjs";
import { validationResult,matchedData } from "express-validator";


export const getUsersHandler = async (request, response) => {
    try {
        const {
            query: { filter, value }
        } = request;

        if (filter && value) {
            if (filter === "age") {
                const users = await User.find({ [filter]: parseInt(value) });
                return response.send(users);
            }
            const users = await User.find({ [filter]: { $regex: value, $options: "i" } });
            return response.send(users);
        }

        const users = await User.find();
        return response.send(users);

    } catch (error) {
        console.error(error);
        return response.status(500).send("Internal Server Error");
    }
};

export const getUserByIdHandler = async (request,response) => { // route param
    const { id } = request.params;
    try {
        const user = await User.findById(id);
        if (!user) return response.status(404).send({ message: "User not found" });
        return response.status(200).send(user);
    } catch (error) {
        return response.status(400).send({ message: "Invalid user ID" });
    }
};

export const deleteByIdHandler = async (request, response) => {
    const { id } = request.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return response.status(404).send({ message: "User not found" });
        return response.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return response.status(400).send({ message: "Invalid request" });
    }
};

export const patchByIdHandler = async (request,response) => {
    const { body } = request;
    const { id } = request.params;
    
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,               // Güncellenecek kullanıcının ID'si
            { $set: body },   // Gövdeden gelen yeni veriler
            { new: true }     // Güncellenmiş kullanıcıyı döndür
        );

        if (!updatedUser) return response.status(404).send({ message: "User not found" });
        return response.status(200).send(updatedUser);

    } catch (error) {
        return response.status(400).send({ message: "Invalid request" });
    }
};

export const putByIdHandler = async (request, response) => {
    const { id } = request.params; 
    const { body } = request;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,                // Güncellenecek belgenin ID'si
            { ...body },       // Gövdedeki yeni veriler
            { new: true, runValidators: true } // Güncellenmiş belgeyi döndür ve validasyonları çalıştır
        );

        if (!updatedUser) return response.status(404).send({ message: "User not found" });
        return response.status(200).send(updatedUser);
    } catch (error) {
        console.error(error);
        return response.status(400).send({ message: "Invalid request" });
    }
};

export const postHandler = async (request,response) => {
    const result = validationResult(request);
    if(!result.isEmpty()) return response.status(400).send(result.array());
    
    const data = matchedData(request);
    data.password = hashPassword(data.password);
    const newUser = new User(data);
    try {
        const savedUser = await newUser.save();
        return response.status(201).send(savedUser);
    } catch (error) {
        console.log(error);
        return response.sendStatus(400);
    }
};

export const initialHandler = (request,response) => {
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;
    response.cookie("hello","world",{maxAge:60000 * 60,signed:true});
    response.status(201).send({msg:"Hello"});
};




