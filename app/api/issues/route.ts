import authOptions from "@/app/auth/authOptions";
import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const session = await getServerSession(authOptions);
    if(!session)
        return NextResponse.json({}, {status: 401})

    const body = await request.json()
    const validation = issueSchema.safeParse(body)

    if(!validation.success)
        return NextResponse.json(validation.error.format, {status: 400})

    const newIssue = await prisma.issue.create({
        data: {title: body.title, description: body.description}
    })

    return NextResponse.json(newIssue, {status: 200})
}

export async function GET(request: NextRequest){
    const url = new URL(request.url)

    if(url.searchParams.get("latest")){
        const issues = await prisma.issue.findMany({orderBy: {createdAt: 'desc'}, take: 5, include: {assignedToUser: true}});
        return NextResponse.json(issues, {status: 200});
    }


    const status = url.searchParams.get("status");
    const orderBy = url.searchParams.get("orderBy");
    const orders = ['title', 'status', 'createdAt'];
    const page = parseInt(url.searchParams.get("page")!);
    const pageSize = parseInt(url.searchParams.get("pageSize")!);

    const order = orders.includes(orderBy || "") ? {[orderBy!]: 'asc'} : undefined;
    

    if(status){
        const statuses = Object.values(Status);
        if(statuses.includes(status as Status)){
            const issues = await prisma.issue.findMany({where: {status: status as Status}, orderBy: order, skip:(page -1) * page, take: pageSize});
            const issuesCount = await prisma.issue.count({where: {status: status as Status}})
            return NextResponse.json({issues: issues, issuesCount: issuesCount}, {status: 200})
        }else{
            const issues = await prisma.issue.findMany({orderBy: order, skip:(page -1) * page, take: pageSize});
            const issuesCount = await prisma.issue.count()
            return NextResponse.json({issues: issues, issuesCount: issuesCount}, {status: 200})
        }
    }
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues, {status: 200})
}
