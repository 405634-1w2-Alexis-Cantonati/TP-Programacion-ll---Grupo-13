using Back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Back.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private VETERINARIAContext _context;
        public UsuarioRepository(VETERINARIAContext context)
        {
            _context = context;
        }
        public bool IniciarSesion(Usuario usuario)
        {

            if (!string.IsNullOrEmpty(usuario.NUsuario) && !string.IsNullOrEmpty(usuario.Constraseña))
            {
                var usuarioEncontrado = _context.Usuarios.FirstOrDefault(e => e.NUsuario == usuario.NUsuario);
                if (usuarioEncontrado != null && usuarioEncontrado.Constraseña == usuario.Constraseña)
                {
                    return true;
                }
            }
            return false;
        }
        public bool Create(Usuario usuario)
        {
            var aux = _context.Usuarios.FirstOrDefault(e => e.NUsuario == usuario.NUsuario);
            if (aux == null)
            {
                _context.Usuarios.Add(usuario);
                var response = _context.SaveChanges();
                if (response > 0)
                {
                    return true;
                }
            }
            return false;
        }

    }
}
