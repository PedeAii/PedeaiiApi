import { Request, Response } from "express";
import { IntegratorService } from "../Domain/Service/integrator-service";
import { IntegratorAuthDTO } from "./dto/integrator-auth-dto";
import { Success } from "../../../../Kernel/Http/Success"
import { Cryptography } from "src/utils/Cryptography/Cryptography";

export class IntegratorController {

    private integratorService: IntegratorService

    constructor() {
        this.integratorService = new IntegratorService();
    }

    public authAction = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        
        const output = await this.integratorService.auth(
            new IntegratorAuthDTO(username, password)
        );
        
        const success = new Success({ 'token': output });

        return res.status(200).json(success.render());
    }
}
