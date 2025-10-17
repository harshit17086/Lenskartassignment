import { Request, Response } from "express";
import prisma from "../db";

// Get all deals
export const getDeals = async (req: Request, res: Response) => {
    try {
        const deals = await prisma.deal.findMany({
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
                _count: {
                    select: {
                        activities: true,
                        notes: true,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            data: deals,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch deals",
            error: error.message,
        });
    }
};

// Get a single deal by ID
export const getDealById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deal = await prisma.deal.findUnique({
            where: { id },
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
                activities: true,
                notes: true,
            },
        });

        if (!deal) {
            return res.status(404).json({
                success: false,
                message: "Deal not found",
            });
        }

        res.status(200).json({
            success: true,
            data: deal,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch deal",
            error: error.message,
        });
    }
};

// Create a new deal
export const createDeal = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            value,
            stage,
            probability,
            expectedCloseDate,
            userId,
            contactId,
            companyId,
        } = req.body;

        if (!title || !value || !userId) {
            return res.status(400).json({
                success: false,
                message: "Title, value, and userId are required",
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

        const newDeal = await prisma.deal.create({
            data: {
                title,
                description,
                value: parseFloat(value),
                stage: stage || "LEAD",
                probability: probability ? parseInt(probability) : 0,
                expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
                userId,
                contactId: contactId || null,
                companyId: companyId || null,
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
            },
        });

        res.status(201).json({
            success: true,
            message: "Deal created successfully",
            data: newDeal,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create deal",
            error: error.message,
        });
    }
};

// Update a deal
export const updateDeal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            value,
            stage,
            probability,
            expectedCloseDate,
            actualCloseDate,
            contactId,
            companyId,
        } = req.body;

        const deal = await prisma.deal.findUnique({
            where: { id },
        });

        if (!deal) {
            return res.status(404).json({
                success: false,
                message: "Deal not found",
            });
        }

        const updatedDeal = await prisma.deal.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description !== undefined && { description }),
                ...(value && { value: parseFloat(value) }),
                ...(stage && { stage }),
                ...(probability !== undefined && { probability: parseInt(probability) }),
                ...(expectedCloseDate !== undefined && {
                    expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : null,
                }),
                ...(actualCloseDate !== undefined && {
                    actualCloseDate: actualCloseDate ? new Date(actualCloseDate) : null,
                }),
                ...(contactId !== undefined && { contactId }),
                ...(companyId !== undefined && { companyId }),
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
            },
        });

        res.status(200).json({
            success: true,
            message: "Deal updated successfully",
            data: updatedDeal,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update deal",
            error: error.message,
        });
    }
};

// Delete a deal
export const deleteDeal = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deal = await prisma.deal.findUnique({
            where: { id },
        });

        if (!deal) {
            return res.status(404).json({
                success: false,
                message: "Deal not found",
            });
        }

        await prisma.deal.delete({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: "Deal deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete deal",
            error: error.message,
        });
    }
};
