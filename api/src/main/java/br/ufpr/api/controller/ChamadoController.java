package br.ufpr.api.controller;

import java.time.LocalDate;
import java.util.List;

import br.ufpr.api.dto.OrcamentoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RestController;

import br.ufpr.api.dto.ChamadoCreateDTO;
import br.ufpr.api.dto.ChamadoDTO;
import br.ufpr.api.dto.ChamadoPatchDTO;
import br.ufpr.api.dto.ChamadoUpdateDTO;
import br.ufpr.api.dto.EtapaCreateDTO;
import br.ufpr.api.dto.EtapaHistoricoDTO;
import br.ufpr.api.model.enums.StatusConserto;
import br.ufpr.api.service.ChamadoService;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
@CrossOrigin
@RestController
public class ChamadoController {
    @Autowired
    private ChamadoService service;

    @PostMapping("/chamados")
    @PreAuthorize("hasAuthority('CLIENTE')")
    public ChamadoDTO addNewChamado(@RequestBody ChamadoCreateDTO newChamado,
    @AuthenticationPrincipal UserDetails activeUser)
    {
        return service.addNewChamado(newChamado, activeUser);
    }

    @GetMapping("/chamados")
    public List<ChamadoDTO> getChamados(
    @RequestParam(required = false) StatusConserto status,
    @RequestParam(required = false, name = "dataInicio")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    LocalDate dataInicio,
    @RequestParam(required = false, name = "dataFim")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    LocalDate dataFim,
    @AuthenticationPrincipal UserDetails activeUser) {

        return service.buscarChamados(status, dataInicio, dataFim, activeUser);
    }

    @GetMapping("/chamados/{id}")
    public ChamadoDTO getChamadoById(@PathVariable Integer id) {
        return service.getChamadoById(id);
    }

    @PutMapping("chamados/{id}")
    public ResponseEntity<ChamadoDTO> updateChamado(
    @PathVariable Integer id,
    @Valid @RequestBody ChamadoUpdateDTO updatedChamado,
    @AuthenticationPrincipal UserDetails activeUser) {
        ChamadoDTO dto = service.updateChamado(id, updatedChamado, activeUser);
        return ResponseEntity.ok(dto);

    }

    @PatchMapping("chamados/{id}")
    public ResponseEntity<String> updateChamadoStatus(
    @PathVariable Integer id,
    @Valid @RequestBody ChamadoPatchDTO updatedChamado,
    @AuthenticationPrincipal UserDetails activeUser) {
        // ChamadoDTO dto = service.updateChamado(id, updatedChamado);

        // return ResponseEntity.ok(dto);
        return ResponseEntity.ok("Deu bom");

    }

    @PostMapping("chamados/{id}/orcamento")
    public ResponseEntity<ChamadoDTO> efetuarOrcamento(
    @PathVariable Integer id,
    @Valid @RequestBody OrcamentoDTO orcamento,
    @AuthenticationPrincipal UserDetails activeUser) {
        ChamadoDTO dto = service.efetuarOrcamento(id, orcamento, activeUser);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    @GetMapping("chamados/{id}/etapas")
    public ResponseEntity<List<EtapaHistoricoDTO>> listarEtapas(@PathVariable Integer id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDetails activeUser = (principal instanceof UserDetails u) ? u : null;

        List<EtapaHistoricoDTO> etapas = service.listarEtapas(id, activeUser);

        if (etapas.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(etapas);
    }

    @PostMapping("/chamados/{id}/etapas")
    public ResponseEntity<ChamadoDTO> novaEtapa(@PathVariable Integer id,
                                                @Valid @RequestBody EtapaCreateDTO dto,
                                                @AuthenticationPrincipal UserDetails activeUser) {

        ChamadoDTO atualizado = service.novaEtapa(id, dto);

        return ResponseEntity.ok(atualizado);
    }

}
