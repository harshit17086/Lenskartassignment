import { Request, Response } from "express";
import prisma from "../db";

// Get all notes
export const getNotes = async (req: Request, res: Response) => {
    try {
        const notes = await prisma.note.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
                contact: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                company: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                deal: {
                    select: {
                        id: true,
                        title: true,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            data: notes,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch notes",
            error: error.message,
        });
    }
};

// Get a single note by ID
export const getNoteById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const note = await prisma.note.findUnique({
            where: { id },
            include: {
                user: true,
                contact: true,
                company: true,
                deal: true,
            },
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        res.status(200).json({
            success: true,
            data: note,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch note",
            error: error.message,
        });
    }
};

// Create a new note
export const createNote = async (req: Request, res: Response) => {
    try {
        const {
            title,
            content,
            userId,
            contactId,
            companyId,
            dealId,
        } = req.body;

        if (!content || !userId) {
            return res.status(400).json({
                success: false,
                message: "Content and userId are required",
            });
        }

        const userExists = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const newNote = await prisma.note.create({
            data: {
                title,
                content,
                userId,
                contactId: contactId || null,
                companyId: companyId || null,
                dealId: dealId || null,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
                contact: true,
                company: true,
                deal: true,
            },
        });

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: newNote,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create note",
            error: error.message,
        });
    }
};

// Update a note
export const updateNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            title,
            content,
            contactId,
            companyId,
            dealId,
        } = req.body;

        const note = await prisma.note.findUnique({
            where: { id },
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        const updatedNote = await prisma.note.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(content && { content }),
                ...(contactId !== undefined && { contactId }),
                ...(companyId !== undefined && { companyId }),
                ...(dealId !== undefined && { dealId }),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
                contact: true,
                company: true,
                deal: true,
            },
        });

        res.status(200).json({
            success: true,
            message: "Note updated successfully",
            data: updatedNote,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update note",
            error: error.message,
        });
    }
};

// Delete a note
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const note = await prisma.note.findUnique({
            where: { id },
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }

        await prisma.note.delete({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete note",
            error: error.message,
        });
    }
};
