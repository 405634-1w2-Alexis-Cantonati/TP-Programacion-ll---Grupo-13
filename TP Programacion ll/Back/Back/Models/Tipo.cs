﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Back.Models
{
    public partial class Tipo
    {
        public Tipo()
        {
            Mascota = new HashSet<Mascota>();
        }

        public int IdTipo { get; set; }
        public string Nombre { get; set; }

        [JsonIgnore]
        public virtual ICollection<Mascota> Mascota { get; set; }
    }
}