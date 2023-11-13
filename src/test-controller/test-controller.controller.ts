import {Controller, Get} from '@nestjs/common';
import { AppService } from "../app.service";

@Controller('test-controller')
export class TestControllerController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        return 'test-controller';
    }
}
