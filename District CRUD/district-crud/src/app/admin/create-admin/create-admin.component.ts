import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RegisterService } from 'src/app/register.service';
import { Admin } from 'src/app/models/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {

  AnimeForm: any;
  data = false;
  message: string;

  constructor(private formbulider: FormBuilder, private dataService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.AnimeForm = this.formbulider.group({
      Name: ['', [Validators.required]],
      Surname: ['', [Validators.required]],
      ID_Number: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      
    })
  }

  onFormSubmit(AnimeForm) {
    const anime = AnimeForm.value;
    this.CreateAnime(anime)
  }

  CreateAnime(anime: Admin) {
    this.dataService.AddAnime(anime).subscribe(() => {
      this.data = true;
      this.message = 'Anime has been saved successfully';
      this.router.navigate(['/admin'])
    });
  }

  GoToList() {
    this.router.navigate(['/admin'])
  }
}
