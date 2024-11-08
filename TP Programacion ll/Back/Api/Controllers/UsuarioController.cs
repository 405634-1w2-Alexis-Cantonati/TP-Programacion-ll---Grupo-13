using Back.Models;
using Back.Repositories;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository _repository;

        public UsuarioController(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public IActionResult IniciarSesion([FromBody] Usuario usuario)
        {
            var response = _repository.IniciarSesion(usuario);
            if (response)
            {
                var token = GenerarJwt(usuario.NUsuario);
                return Ok(new { token });
            }
            return BadRequest("Credenciales incorrectas.");
        }

        private object GenerarJwt(string nombre)
        {
            var llaveSeguridad = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ClaveSecreta12345"));
            var credencial = new SigningCredentials(llaveSeguridad, SecurityAlgorithms.HmacSha256);

            var identificadorUnico = Guid.NewGuid().ToString();
            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Sub, nombre),
            new Claim(JwtRegisteredClaimNames.Jti, identificadorUnico)
        };

            var token = new JwtSecurityToken(
                issuer: "https://localhost:7042",
                audience: "https://localhost:5500",
                claims: claims,
                expires: DateTime.Now.AddYears(1),
                signingCredentials: credencial
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("registro")]
        public IActionResult Create(Usuario usuario)
        {
            var response = _repository.Create(usuario);
            if (response)
            {
                return Ok("Satisfactorio");
            }
            else
            {
                return BadRequest("Problema");
            }
        }

    }
}

