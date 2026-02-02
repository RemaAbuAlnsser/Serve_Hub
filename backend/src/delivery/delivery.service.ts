import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DeliveryService {
  constructor(private databaseService: DatabaseService) {}

  async onModuleInit() {
    // Create delivery_cities table if it doesn't exist
    await this.createDeliveryTable();
  }

  private async createDeliveryTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS delivery_cities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        city_name VARCHAR(255) NOT NULL UNIQUE,
        delivery_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await this.databaseService.query(createTableQuery);
      console.log('Delivery cities table created/verified successfully');
    } catch (error) {
      console.error('Error creating delivery cities table:', error);
    }
  }

  async findAll() {
    const query = 'SELECT * FROM delivery_cities ORDER BY city_name ASC';
    return this.databaseService.query(query);
  }

  async findOne(id: number) {
    const query = 'SELECT * FROM delivery_cities WHERE id = ?';
    const cities: any = await this.databaseService.query(query, [id]);
    return cities[0] || null;
  }

  async create(data: any) {
    try {
      const query = 'INSERT INTO delivery_cities (city_name, city_name_en, delivery_price) VALUES (?, ?, ?)';
      const result: any = await this.databaseService.query(query, [
        data.city_name,
        data.city_name_en || null,
        data.delivery_price,
      ]);

      return { success: true, id: result.insertId, message: 'تم إضافة المدينة بنجاح' };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return { success: false, message: 'هذه المدينة موجودة مسبقاً' };
      }
      console.error('Error creating delivery city:', error);
      return { success: false, message: 'فشل إضافة المدينة' };
    }
  }

  async update(id: number, data: any) {
    try {
      const query = 'UPDATE delivery_cities SET city_name = ?, city_name_en = ?, delivery_price = ? WHERE id = ?';
      await this.databaseService.query(query, [
        data.city_name,
        data.city_name_en || null,
        data.delivery_price,
        id,
      ]);
      return { success: true, message: 'تم تحديث المدينة بنجاح' };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return { success: false, message: 'هذه المدينة موجودة مسبقاً' };
      }
      console.error('Error updating delivery city:', error);
      return { success: false, message: 'فشل تحديث المدينة' };
    }
  }

  async remove(id: number) {
    try {
      const query = 'DELETE FROM delivery_cities WHERE id = ?';
      await this.databaseService.query(query, [id]);
      return { success: true, message: 'تم حذف المدينة بنجاح' };
    } catch (error) {
      console.error('Error deleting delivery city:', error);
      return { success: false, message: 'فشل حذف المدينة' };
    }
  }

  async findByCity(cityName: string) {
    const query = 'SELECT * FROM delivery_cities WHERE city_name = ?';
    const cities: any = await this.databaseService.query(query, [cityName]);
    return cities[0] || null;
  }
}
