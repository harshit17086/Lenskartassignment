import { Request, Response } from "express";
import prisma from "../db";

// Get all activities
export const getActivities = async (req: Request, res: Response) => {
    try {
        const activities = await prisma.activity.findMany({
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
                        email: true,
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
                        value: true,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            data: activities,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch activities",
            error: error.message,
        });
    }
};

// Get a single activity by ID
export const getActivityById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const activity = await prisma.activity.findUnique({
            where: { id },
            include: {
                user: true,
                contact: true,
                company: true,
                deal: true,
            },
        });

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found",
            });
        }

        res.status(200).json({
            success: true,
            data: activity,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch activity",
            error: error.message,
        });
    }
};

// Create a new activity
export const createActivity = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            type,
            status,
            dueDate,
            priority,
            userId,
            contactId,
            companyId,
            dealId,
        } = req.body;

        if (!title || !type || !userId) {
            return res.status(400).json({
                success: false,
                message: "Title, type, and userId are required",
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

        const newActivity = await prisma.activity.create({
            data: {
                title,
                description,
                type,
                status: status || "PENDING",
                dueDate: dueDate ? new Date(dueDate) : null,
                priority: priority || "Medium",
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
            message: "Activity created successfully",
            data: newActivity,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create activity",
            error: error.message,
        });
    }
};

// Update an activity
export const updateActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            type,
            status,
            dueDate,
            completedAt,
            priority,
            contactId,
            companyId,
            dealId,
        } = req.body;

        const activity = await prisma.activity.findUnique({
            where: { id },
        });

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found",
            });
        }

        const updatedActivity = await prisma.activity.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(description !== undefined && { description }),
                ...(type && { type }),
                ...(status && { 
                    status,
                    ...(status === "COMPLETED" && !completedAt && { completedAt: new Date() }),
                }),
                ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
                ...(completedAt !== undefined && { completedAt: completedAt ? new Date(completedAt) : null }),
                ...(priority && { priority }),
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
            message: "Activity updated successfully",
            data: updatedActivity,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update activity",
            error: error.message,
        });
    }
};

// Delete an activity
export const deleteActivity = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const activity = await prisma.activity.findUnique({
            where: { id },
        });

        if (!activity) {
            return res.status(404).json({
                success: false,
                message: "Activity not found",
            });
        }

        await prisma.activity.delete({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: "Activity deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete activity",
            error: error.message,
        });
    }
};
