using AutoMapper;
using Business.DTOs;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Text;



namespace Business.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() : base("MappingProfile")
        {
            CreateMap<Reimbursement, ReimbursementModel>().ReverseMap();
            CreateMap<SignIn, SignInModel>().ReverseMap();
            CreateMap<User, UserModel>().ReverseMap();
            CreateMap<SignUp, SignUpModel>().ReverseMap();
        }
    }
}