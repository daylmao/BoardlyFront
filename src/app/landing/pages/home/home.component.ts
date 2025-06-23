import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { NavComponent } from '../../components/nav/nav.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CtaComponent } from '../../components/cta/cta.component';

@Component({
  selector: 'app-home',
  imports: [
    HowItWorksComponent,
    FeaturesComponent,
    HeroComponent,
    NavComponent,
    FooterComponent,
    CtaComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
