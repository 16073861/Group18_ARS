import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { RegisterService } from 'src/app/register.service';
import { Admin } from 'src/app/models/admin';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {

  AnimeForm: FormGroup;
  AnimeID: number;
  data = false;
  message: string;

  constructor(private formbulider: FormBuilder, private dataService: RegisterService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.AnimeID = id;
    })

    this.dataService.GetAnime()
      .subscribe(data => data.forEach(element => {

        if (element.Admin_ID == this.AnimeID) {

          this.AnimeForm = this.formbulider.group({
            Name: [element.Name, Validators.required],
            Surname: [element.Surname, [Validators.required]],
            Email: [element.Email, [Validators.required]],
            ID_Number: [element.ID_Number, [Validators.required]],
          })
        }
      }));
  }

  onFormSubmit(AnimeForm) {
    const anime = AnimeForm.value;
    this.EditAnime(anime)
  }

  EditAnime(anime: Admin) {
    this.dataService.UpdateAnime(anime).subscribe(() => {
      this.data = true;
      this.message = "Anime has been successfully updated!";
      this.router.navigate(['/admin']);
    });
  }

  GoToList() {
    this.router.navigate(['/admin'])
  }

}
