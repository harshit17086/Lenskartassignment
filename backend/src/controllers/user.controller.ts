import { Request, Response } from "express";
import prisma from "../db";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                products: true,
                contacts: true,
            },
        });
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

// Get a single user by ID
export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                products: true,
                contacts: true,
            },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user",
            error: error.message,
        });
    }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
            },
        });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: newUser,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create user",
            error: error.message,
        });
    }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { email, name } = req.body;

        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(email && { email }),
                ...(name && { name }),
            },
        });

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update user",
            error: error.message,
        });
    }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await prisma.user.delete({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message,
        });
    }
};
