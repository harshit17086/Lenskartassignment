import { Request, Response } from "express";
import prisma from "../db";

// Get all companies
export const getCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await prisma.company.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
                contacts: true,
                deals: true,
                _count: {
                    select: {
                        contacts: true,
                        deals: true,
                        activities: true,
                    },
                },
            },
        });
        res.status(200).json({
            success: true,
            data: companies,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch companies",
            error: error.message,
        });
    }
};

// Get a single company by ID
export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const company = await prisma.company.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                    },
                },
                contacts: true,
                deals: true,
                activities: true,
                notes: true,
            },
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        res.status(200).json({
            success: true,
            data: company,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch company",
            error: error.message,
        });
    }
};

// Create a new company
export const createCompany = async (req: Request, res: Response) => {
    try {
        const {
            name,
            industry,
            website,
            phone,
            address,
            city,
            state,
            country,
            size,
            revenue,
            description,
            userId,
        } = req.body;

        if (!name || !userId) {
            return res.status(400).json({
                success: false,
                message: "Name and userId are required",
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

        const newCompany = await prisma.company.create({
            data: {
                name,
                industry,
                website,
                phone,
                address,
                city,
                state,
                country,
                size,
                revenue: revenue ? parseFloat(revenue) : null,
                description,
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
            message: "Company created successfully",
            data: newCompany,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create company",
            error: error.message,
        });
    }
};

// Update a company
export const updateCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            name,
            industry,
            website,
            phone,
            address,
            city,
            state,
            country,
            size,
            revenue,
            description,
        } = req.body;

        const company = await prisma.company.findUnique({
            where: { id },
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        const updatedCompany = await prisma.company.update({
            where: { id },
            data: {
                ...(name && { name }),
                ...(industry !== undefined && { industry }),
                ...(website !== undefined && { website }),
                ...(phone !== undefined && { phone }),
                ...(address !== undefined && { address }),
                ...(city !== undefined && { city }),
                ...(state !== undefined && { state }),
                ...(country !== undefined && { country }),
                ...(size !== undefined && { size }),
                ...(revenue !== undefined && { revenue: revenue ? parseFloat(revenue) : null }),
                ...(description !== undefined && { description }),
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
            message: "Company updated successfully",
            data: updatedCompany,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update company",
            error: error.message,
        });
    }
};

// Delete a company
export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const company = await prisma.company.findUnique({
            where: { id },
        });

        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        await prisma.company.delete({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: "Company deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete company",
            error: error.message,
        });
    }
};
