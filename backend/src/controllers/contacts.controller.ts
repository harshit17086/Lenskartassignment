import { Request, Response } from "express";
import prisma from "../db";

// Get all contacts
export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await prisma.contact.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch contacts",
            error: error.message,
        });
    }
};

// Get a single contact by ID
export const getContactById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const contact = await prisma.contact.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        res.status(200).json({
            success: true,
            data: contact,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch contact",
            error: error.message,
        });
    }
};

// Create a new contact
export const createContact = async (req: Request, res: Response) => {
    const { firstName, lastName, address, email, phone, userId } = req.body;

    try {
        // Validate required fields
        if (!firstName || !lastName || !email || !userId) {
            return res.status(400).json({
                success: false,
                message: "firstName, lastName, email, and userId are required",
            });
        }

        // Check if user exists
        const userExists = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const newContact = await prisma.contact.create({
            data: {
                firstName,
                lastName,
                address,
                email,
                phone,
                userId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });

        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: newContact,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create contact",
            error: error.message,
        });
    }
};

// Update a contact
export const updateContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, address, email, phone } = req.body;

        const contact = await prisma.contact.findUnique({
            where: { id },
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        const updatedContact = await prisma.contact.update({
            where: { id },
            data: {
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(address !== undefined && { address }),
                ...(email && { email }),
                ...(phone !== undefined && { phone }),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
            },
        });

        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: updatedContact,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update contact",
            error: error.message,
        });
    }
};

// Delete a contact
export const deleteContact = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const contact = await prisma.contact.findUnique({
            where: { id },
        });

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        await prisma.contact.delete({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete contact",
            error: error.message,
        });
    }
};
