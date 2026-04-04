import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../../services/team';
import { CatTypeTeam } from '../../../../services/cat-type-team';
import { ProfileService } from "../../../../services/profile";
import { Request } from '../../../../models/request';


@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-team.html',
  styleUrl: './create-team.css'
})
export class CreateTeam implements OnInit {

  teamForm: FormGroup;
  usernameInvite: string = '';
  invitedPlayers: Request[] = [];
  teamIdCreated!: number;
  catalogoTeam: any[] = [];
  isDragging = false;
  imageFile!: File | null;
  imagePreview: string | ArrayBuffer | null = null;
  owner:any


  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private catalogoTipoEquipo: CatTypeTeam,
    private profileService:ProfileService
  ) {

    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      ownerId: ['',],
      category: [0, Validators.required],
      primaryColor: ['#000000'],
      alternativeColor: ['#000000',],
      image: [null]
    });
    
  }

  ngOnInit(): void {
    this.catalogoTeam = this.catalogoTipoEquipo.getCatTypeTournamentTeam();
    this.owner=this.profileService.getProfile();

    
    this.teamForm.patchValue({
      ownerId: this.owner.idPlayer
    });

  }

  resetForm() {
    this.teamForm.reset({
      name: '',
      category: 0,
      primaryColor: '#000000',
      alternativeColor: '#000000',
      image: null
    });

    this.imagePreview = null;
    this.imageFile = null;
  }

  createTeam() {

    if (this.teamForm.invalid) return;

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const newTeam = {
      idTeam: 0,
      name: this.teamForm.value.name,
      category: this.teamForm.value.category,
      ownerId: this.owner.idPlayer,
      primaryColor: this.teamForm.value.primaryColor,
      alternativeColor: this.teamForm.value.alternativeColor,
      image: this.teamForm.value.image,
      players: []
    };

    const createdTeam:any = this.teamService.createTeam(newTeam);
    this.teamIdCreated = createdTeam;
    this.resetForm();
  }

  

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      this.handleFile(file);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    this.imageFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);

    this.teamForm.patchValue({
      image: file
    });
  }

}