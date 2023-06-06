﻿using AutoMapper;
using SportsStore.Models;
using TaskManagerApi.Data;
using TaskManagerApi.Models;
using TaskManagerApi.Models.Developer;

namespace TaskManagerApi
{
    public class AutoMapperProfiler : Profile
    {
        public AutoMapperProfiler()
        {
            CreateMap<RegisterRequestDTO, ApplicationUser>()
               .ForMember(au => au.UserName, rrd => rrd.MapFrom(x => x.UserName))
               .ForMember(au => au.Email, rrd => rrd.MapFrom(x => x.UserName))
               .ForMember(au => au.NormalizedEmail, rrd => rrd.MapFrom(x => x.UserName.ToLower()))
               .ForMember(au => au.Name, rrd => rrd.MapFrom(x => x.Name))
               .ReverseMap();
            CreateMap<AddDeveloperDTO, ApplicationUser>()
               .ForMember(au => au.UserName, rrd => rrd.MapFrom(x => x.DeveloperName))
               .ForMember(au => au.Email, rrd => rrd.MapFrom(x => x.DeveloperName))
               .ForMember(au => au.NormalizedEmail, rrd => rrd.MapFrom(x => x.DeveloperName.ToLower()))
               .ForMember(au => au.Name, rrd => rrd.MapFrom(x => x.Name))
               .ReverseMap();
            CreateMap<UpdateDeveloperDTO, ApplicationUser>()
               .ForMember(au => au.UserName, rrd => rrd.MapFrom(x => x.DeveloperName))
               .ForMember(au => au.Email, rrd => rrd.MapFrom(x => x.DeveloperName))
               .ForMember(au => au.NormalizedEmail, rrd => rrd.MapFrom(x => x.DeveloperName.ToLower()))
               .ForMember(au => au.Name, rrd => rrd.MapFrom(x => x.Name))
               .ReverseMap();
        }
    }
}
