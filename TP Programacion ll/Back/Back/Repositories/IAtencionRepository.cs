using Back.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.Repositories
{
    internal interface IAtencionRepository
    {
        public bool Create(Atencion obj);
        public bool Update(Atencion obj);
        public bool Delete(int id);
        public Atencion? GetById(int id);
        public List<Atencion> GetAll();
    }
}
