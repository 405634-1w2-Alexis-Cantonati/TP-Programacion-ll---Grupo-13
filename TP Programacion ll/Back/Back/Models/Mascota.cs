﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Back.Models
{
    public partial class Mascota
    {
        public Mascota()
        {
            Atencions = new HashSet<Atencion>();
        }

        public int IdMascota { get; set; }
        public int? IdTipo { get; set; }
        public int? IdCliente { get; set; }
        public string Nombre { get; set; }
        public int? Edad { get; set; }

        [JsonIgnore]
        public virtual Cliente IdClienteNavigation { get; set; }
        [JsonIgnore]
        public virtual Tipo IdTipoNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Atencion> Atencions { get; set; }
    }
}