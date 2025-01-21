import { getUserByIdHandler, deleteByIdHandler,patchByIdHandler,putByIdHandler,postHandler} from "../handlers/users.mjs"
import { validationResult,matchedData } from "express-validator";
import { User } from "../mongoose/user.mjs"
import { hashPassword } from "../utils/helpers.mjs"; 


jest.mock("../mongoose/user.mjs"); // Mocking the user.mjs module
jest.mock("../utils/helpers.mjs", () => ({ 
    hashPassword: jest.fn(), // Mocking the helpers.mjs module with specific functions(hashPassword)
}));
jest.mock("express-validator", () => ({
    validationResult: jest.fn(),
    matchedData: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("get users", () => {
    it("should get user by id", async () => {
        const mockRequest = { params: { id: "678e558e11e593b90e161f16" } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        const mockUser = { id: "678e558e11e593b90e161f16" };

        User.findById.mockResolvedValue(mockUser); // returned mockUser

        await getUserByIdHandler(mockRequest, mockResponse);

        expect(User.findById).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(mockUser);
    });

    it("should user not found", async () => {
        const mockRequest = { params: { id: "İnvalidi-Id" } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(), // status methodunu mock'lama
            send: jest.fn(), // send methodunu mock'lama
        };
        const mockUser = { id: "678e558e11e593b90e161f16" };

        User.findById.mockResolvedValue(null);
        await getUserByIdHandler(mockRequest, mockResponse);

        expect(User.findById).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should invalid user id", async () => {
        const mockRequest = { params: { id: "İnvalidi-Id" } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(), // status methodunu mock'lama
            send: jest.fn(), // send methodunu mock'lama
        };

        User.findById.mockRejectedValue();

        await getUserByIdHandler(mockRequest, mockResponse);

        expect(User.findById).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: "Invalid user ID" });

    });
});

describe("delete user", () => {
    it("should deleted successfully", async () => {
        const mockRequest = { params: { id: "12345" } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn(), 
        };
        const deletedUser = { id: "12345", name: "John" };

        User.findByIdAndDelete.mockResolvedValue(deletedUser);

        await deleteByIdHandler(mockRequest, mockResponse);

        expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: "User deleted successfully" });
    });

    it("should not deleted because of user not found", async () => {
        const mockRequest = { params: { id: "12345" } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        User.findByIdAndDelete.mockResolvedValue(null);

        await deleteByIdHandler(mockRequest, mockResponse);

        expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should invalid user id", async () => {
        const mockRequest = { params: { id: "Invalid-id" } };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        User.findByIdAndDelete.mockRejectedValue(new Error("Invalid request"));

        await deleteByIdHandler(mockRequest, mockResponse);

        expect(User.findByIdAndDelete).toHaveBeenCalledWith(mockRequest.params.id);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.send).toHaveBeenCalledWith({ message: "Invalid request" });
    });
});

describe("patch user", () => {
    it("should patch user successfully", async () => {
        const mockRequest = { 
            params: { id: "12345" },
            body: { age: "18" } 
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn(), 
        };
        const updatedUser = { id: "12345", age: "18" };

        User.findByIdAndUpdate.mockResolvedValue(updatedUser);

        await patchByIdHandler(mockRequest, mockResponse);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            mockRequest.params.id,
            { $set: mockRequest.body },
            { new: true }
        );
        
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(updatedUser);

    });


    it("user not found", async () => {
        const mockRequest = { 
            params: { id: "12345" },
            body: { age: "18" } 
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn(), 
        };

        User.findByIdAndUpdate.mockResolvedValue(null);

        await patchByIdHandler(mockRequest, mockResponse);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            mockRequest.params.id,
            { $set: mockRequest.body },
            { new: true }
        );
        
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.send).toHaveBeenCalledWith({message:"User not found"});

    });
});


describe("put user", () => {
    it("should patch user successfully", async () => {
        const mockRequest = { 
            params: { id: "12345" },
            body: { age: "18" } 
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn(), 
        };
        const updatedUser = { id: "12345", age: "18" };

        User.findByIdAndUpdate.mockResolvedValue(updatedUser);

        await putByIdHandler(mockRequest, mockResponse);

        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            mockRequest.params.id,
            { ...mockRequest.body },
            { new: true, runValidators: true}
        );
        
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.send).toHaveBeenCalledWith(updatedUser);
    });
});


describe("post user", () => {
    it("should create user successfully", async () => {
        const mockRequest = { body: { username:"Jack", password:"Test", age: 18 } 
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(), 
            send: jest.fn(),
        };

        validationResult.mockReturnValue({ isEmpty: () => true });
        matchedData.mockReturnValue({ username: "John", password: "Test",age:18 });

        hashPassword.mockReturnValue("hashedPassword123");

        const mockSavedUser = { id: "1", username: "John", password: "hashedPassword123",age:18 };
        User.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockSavedUser),
        }));

        await postHandler(mockRequest, mockResponse);

        expect(validationResult).toHaveBeenCalledWith(mockRequest); 
        expect(matchedData).toHaveBeenCalledWith(mockRequest); 
        expect(User).toHaveBeenCalledWith({ username: "John", password: "hashedPassword123",age:18});
        expect(mockResponse.status).toHaveBeenCalledWith(201); 
        expect(mockResponse.send).toHaveBeenCalledWith(mockSavedUser); 
    });
});


