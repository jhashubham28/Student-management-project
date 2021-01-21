import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Student } from '../models/student';

@Injectable()
export class DataService {
  //private readonly API_URL = 'http://localhost:3000/students';
  private readonly API_URL = 'db.json';


  dataChange: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);
  dialogData: any;


  constructor(private httpClient: HttpClient) {}

  get data(): Student[] {
    return this.dataChange.value;
  }

  

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllStudents(): void {
    this.httpClient.get<Student[]>(this.API_URL).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
      console.log (error.name + ' ' + error.message);
      });
  }

  addStudent(student: Student): void {
    this.dialogData = student;
    this.addItem(student);
  }

  updateStudent(student: Student): void {
    this.dialogData = student;
    this.updateItem(student);
  }

  deleteStudent(id: number): void {
    this.deleteItem(id);
  }
  
  addItem(student: Student): void {
    this.httpClient.post(this.API_URL, student).subscribe(data => {
      this.dialogData = student;
      alert("Student added successfully!!!");
      },
      (err: HttpErrorResponse) => {
        alert("Error adding Student");
        
    });
   }

   deleteItem(id: number): void {
      
    this.httpClient.delete(this.API_URL + "/" + id).subscribe(data => {
      alert("Student deleted successfully!!!");
      },
      (err: HttpErrorResponse) => {
        alert("Error deleting Student");
      }
    );
  }

  updateItem(student: Student): void {
    this.httpClient.put(this.API_URL + "/"+ student.id, student).subscribe(data => {
        this.dialogData = student;
        alert("Student edited successfully!!!");
      },
      (err: HttpErrorResponse) => {
        alert("Error editing Student");
      }
    );
  }
}








