import bcrypt from "bcrypt"
import {prisma} from "../prisma"

export async function registerUser(name: string, email: string, password: string, companyName: string, plan: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    /*const ifCompanyExists = await prisma.company.findUnique({
      where: {
        name: companyName,
      },
    });
    if (ifCompanyExists) {
      return { error: 'Company already exists' };
    }*/
    const company = await prisma.company.create({
      data: {
        name: companyName,
        plan: plan,
      },
    });
  
    const user = await prisma.user.create({
      data: {
        name: name,
        email,
        password: hashedPassword,
        role: 'hr',
        companyId: company.id,
      },
    });
  
    if(user) {
      return { id: user.id, email: user.email, role: user.role, companyId: company.id };
    } else {
      return { error: 'User not created' };
    }
  }
