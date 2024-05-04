import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id';
import { OrderDto } from './dto/order.dto';
import { GetCurrentUserRole } from 'src/common/decorators/get-current-user-role';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Создание заказов' })
  @ApiResponse({ status: 200 })
  @Post()
  createOrder(
    @Body() order: unknown,
    @GetCurrentUserId() userId: string,
  ): Promise<boolean> {
    return this.orderService.createOrder(order, userId);
  }

  @ApiOperation({ summary: 'Получение заказов' })
  @ApiResponse({ status: 200, type: OrderDto })
  @Get()
  getAllOrders(
    @GetCurrentUserId() userId: string,
    @GetCurrentUserRole() userRole: string,
  ): Promise<OrderDto[]> {
    return this.orderService.getAllOrders(userId, userRole);
  }

  // getUserOrders(
  //   @GetCurrentUserId() userId: number,
  // ): Promise<OrderEntity[]> {
  //   return this.orderService.getUserOrders(userId);
  // }

  // getOrder(@Args('id') id: number): Promise<OrderEntity> {
  //   return this.orderService.getOrder(id);
  // }
  // deleteOrder(@Args('id') id: number): Promise<boolean> {
  //   return this.orderService.deleteOrder(id);
  // }

  @Post('/changeStatus')
  @UseGuards(AdminGuard)
  changeStatusOrder(@Body() changeStatus): Promise<boolean> {
    return this.orderService.changeStatusOrder(changeStatus);
  }

  @Post('/delete/:order_id')
  deleteOrder(@Param('order_id') order_id: string) {
    return this.orderService.deleteOrder(order_id);
  }
}
