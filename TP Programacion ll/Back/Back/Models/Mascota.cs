﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

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

        public virtual Cliente IdClienteNavigation { get; set; }
        public virtual Tipo IdTipoNavigation { get; set; }
        public virtual ICollection<Atencion> Atencions { get; set; }
    }
}