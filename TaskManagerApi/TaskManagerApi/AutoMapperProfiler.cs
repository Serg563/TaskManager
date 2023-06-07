using AutoMapper;
using TaskManagerApi.Models;
using TaskManagerApi.Entities;
using TaskManagerApi.Models.Developer;
using TaskManagerApi.Models.DevTask;
using TaskManagerApi.Models;

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
            CreateMap<AddDevTaskDTO, DevTask>()
               .ForMember(main => main.Title, dto => dto.MapFrom(x => x.Title))
               .ForMember(main => main.Description, dto => dto.MapFrom(x => x.Description))
               .ForMember(dest => dest.Duration, opt => opt.MapFrom(x => x.Duration))
               .ReverseMap();
           
        }
    }
}
