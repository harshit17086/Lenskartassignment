import { Request, Response } from "express";
import prisma from "../db";

// Get all leads
export const getLeads = async (req: Request, res: Response) => {
    try {
        const leads = await prisma.lead.findMany({
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
            data: leads,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch leads",
            error: error.message,
        });
    }
};

// Get a single lead by ID
export const getLeadById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const lead = await prisma.lead.findUnique({
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

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        res.status(200).json({
            success: true,
            data: lead,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch lead",
            error: error.message,
        });
    }
};

// Create a new lead
export const createLead = async (req: Request, res: Response) => {
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            source,
            status,
            score,
            notes,
            userId,
        } = req.body;

        if (!firstName || !lastName || !email || !userId) {
            return res.status(400).json({
                success: false,
                message: "firstName, lastName, email, and userId are required",
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

        const newLead = await prisma.lead.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                company,
                jobTitle,
                source,
                status: status || "New",
                score: score ? parseInt(score) : null,
                notes,
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
            message: "Lead created successfully",
            data: newLead,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create lead",
            error: error.message,
        });
    }
};

// Update a lead
export const updateLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            phone,
            company,
            jobTitle,
            source,
            status,
            score,
            notes,
        } = req.body;

        const lead = await prisma.lead.findUnique({
            where: { id },
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        const updatedLead = await prisma.lead.update({
            where: { id },
            data: {
                ...(firstName && { firstName }),
                ...(lastName && { lastName }),
                ...(email && { email }),
                ...(phone !== undefined && { phone }),
                ...(company !== undefined && { company }),
                ...(jobTitle !== undefined && { jobTitle }),
                ...(source !== undefined && { source }),
                ...(status && { status }),
                ...(score !== undefined && { score: score ? parseInt(score) : null }),
                ...(notes !== undefined && { notes }),
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
            message: "Lead updated successfully",
            data: updatedLead,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update lead",
            error: error.message,
        });
    }
};

// Delete a lead
export const deleteLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const lead = await prisma.lead.findUnique({
            where: { id },
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        await prisma.lead.delete({
            where: { id },
        });

        res.status(200).json({
            success: true,
            message: "Lead deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete lead",
            error: error.message,
        });
    }
};

// Convert lead to contact
export const convertLead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { companyId } = req.body;

        const lead = await prisma.lead.findUnique({
            where: { id },
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        if (lead.status === "Converted") {
            return res.status(400).json({
                success: false,
                message: "Lead has already been converted",
            });
        }

        // Create a new contact from the lead
        const newContact = await prisma.contact.create({
            data: {
                firstName: lead.firstName,
                lastName: lead.lastName,
                email: lead.email,
                phone: lead.phone,
                userId: lead.userId,
                companyId: companyId || null,
            },
        });

        // Update lead status to Converted
        await prisma.lead.update({
            where: { id },
            data: {
                status: "Converted",
                convertedToContactId: newContact.id,
            },
        });

        res.status(200).json({
            success: true,
            message: "Lead converted to contact successfully",
            data: {
                lead,
                contact: newContact,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Failed to convert lead",
            error: error.message,
        });
    }
};
