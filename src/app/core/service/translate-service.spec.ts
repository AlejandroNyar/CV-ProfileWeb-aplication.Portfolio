import { TranslateService } from './translate-service';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';

describe('TranslateService', () => {
  let service: TranslateService;
  let mockHttp: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('HttpClient', ['get']);
    service = new TranslateService(mockHttp);
  });

  it('debería establecer el idioma y cargar las traducciones', () => {
    mockHttp.get.and.returnValue(of({ hello: 'Hola' }));

    service.setLanguage('es');

    expect(mockHttp.get).toHaveBeenCalledWith('assets/i18n/es.json');
  });

  it('debería devolver el valor traducido si existe', () => {
    mockHttp.get.and.returnValue(of({ greeting: { morning: 'Buenos días' } }));
    service['translations'].set({ greeting: { morning: 'Buenos días' } });

    const t = service.t('greeting.morning')();
    expect(t).toBe('Buenos días');
  });

  it('debería devolver la clave si no existe traducción', () => {
    service['translations'].set({});
    const t = service.t('missing.key')();
    expect(t).toBe('missing.key');
  });

  it('debería manejar errores al cargar traducciones', () => {
    mockHttp.get.and.returnValue(throwError(() => new Error('Network error')));
    service.setLanguage('en');
    expect(mockHttp.get).toHaveBeenCalled();
  });
});
