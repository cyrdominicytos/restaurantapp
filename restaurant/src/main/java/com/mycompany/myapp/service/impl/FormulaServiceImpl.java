package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Formula;
import com.mycompany.myapp.repository.FormulaRepository;
import com.mycompany.myapp.service.FormulaService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Formula}.
 */
@Service
@Transactional
public class FormulaServiceImpl implements FormulaService {

    private final Logger log = LoggerFactory.getLogger(FormulaServiceImpl.class);

    private final FormulaRepository formulaRepository;

    public FormulaServiceImpl(FormulaRepository formulaRepository) {
        this.formulaRepository = formulaRepository;
    }

    @Override
    public Formula save(Formula formula) {
        log.debug("Request to save Formula : {}", formula);
        return formulaRepository.save(formula);
    }

    @Override
    public Formula update(Formula formula) {
        log.debug("Request to update Formula : {}", formula);
        return formulaRepository.save(formula);
    }

    @Override
    public Optional<Formula> partialUpdate(Formula formula) {
        log.debug("Request to partially update Formula : {}", formula);

        return formulaRepository
            .findById(formula.getId())
            .map(existingFormula -> {
                if (formula.getPrice() != null) {
                    existingFormula.setPrice(formula.getPrice());
                }
                if (formula.getName() != null) {
                    existingFormula.setName(formula.getName());
                }
                if (formula.getPhoto() != null) {
                    existingFormula.setPhoto(formula.getPhoto());
                }
                if (formula.getPhotoContentType() != null) {
                    existingFormula.setPhotoContentType(formula.getPhotoContentType());
                }
                if (formula.getImageType() != null) {
                    existingFormula.setImageType(formula.getImageType());
                }
                if (formula.getDescription() != null) {
                    existingFormula.setDescription(formula.getDescription());
                }
                if (formula.getCreatedDate() != null) {
                    existingFormula.setCreatedDate(formula.getCreatedDate());
                }
                if (formula.getUpdatedDate() != null) {
                    existingFormula.setUpdatedDate(formula.getUpdatedDate());
                }

                return existingFormula;
            })
            .map(formulaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Formula> findAll(Pageable pageable) {
        log.debug("Request to get all Formulas");
        return formulaRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Formula> findOne(Long id) {
        log.debug("Request to get Formula : {}", id);
        return formulaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Formula : {}", id);
        formulaRepository.deleteById(id);
    }
}
